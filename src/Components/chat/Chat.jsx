import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { AiOutlineAudio } from "react-icons/ai"; // Audio Icon
import axios from "axios";
import "./Chat.css";

const Chat = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [recentAudio, setRecentAudio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const audioChunks = useRef([]);
  const API_KEY = process.env.PUBLIC_ASSEMBLYAI_API_KEY;

  useEffect(() => {
    // Request microphone permissions
    const setupRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.current.push(event.data);
          }
        };

        recorder.onstop = async () => {
          setLoading(true);
          const audioBlob = new Blob(audioChunks.current, {
            type: "audio/webm",
          });
          audioChunks.current = []; // Clear for next recording
          const text = await processAudioToText(audioBlob);
          setRecentAudio((prev) => [...prev, text]);
          setTranscription(text);
          setLoading(false);
        };
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    setupRecorder();
  }, []);

  const handleStartRecording = () => {
    if (mediaRecorder) {
      audioChunks.current = [];
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const processAudioToText = async (audioBlob) => {
    try {
      const uploadResponse = await axios.post(
        "https://api.assemblyai.com/v2/upload",
        audioBlob,
        {
          headers: {
            authorization: API_KEY,
            "Content-Type": "application/octet-stream",
          },
        }
      );

      const audioUrl = uploadResponse.data.upload_url;

      const transcriptResponse = await axios.post(
        "https://api.assemblyai.com/v2/transcript",
        { audio_url: audioUrl },
        {
          headers: {
            authorization: API_KEY,
          },
        }
      );

      const transcriptId = transcriptResponse.data.id;

      while (true) {
        const pollingResponse = await axios.get(
          `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
          {
            headers: {
              authorization: API_KEY,
            },
          }
        );

        if (pollingResponse.data.status === "completed") {
          return pollingResponse.data.text;
        } else if (pollingResponse.data.status === "failed") {
          throw new Error("Transcription failed.");
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error("Error processing audio:", error);
      return "Error in transcription.";
    }
  };

  return (
    <Container fluid className="chat-page">
      <Row className="chat-container">
        {/* Recent Audio Section */}
        <Col md={4} className="audio-control-panel">
          <div className="audio-icon-section">
            <AiOutlineAudio size={60} style={{ color: "#6c63ff" }} />
            <h5>Recent Transcriptions</h5>
            <ul className="recent-audio-list">
              {recentAudio.map((audio, index) => (
                <li key={index}>{audio}</li>
              ))}
            </ul>
          </div>
        </Col>

        {/* Transcription Section */}
        <Col md={8} className="message-area">
          <div className="message-box">
            {loading ? (
              <Spinner animation="border" style={{ color: "#6c63ff" }} />
            ) : transcription ? (
              <p>{transcription}</p>
            ) : (
              <p style={{ color: "#aaa" }}>
                Your transcription will appear here...
              </p>
            )}
          </div>

          <div className="microphone-controls">
            <Button
              variant="primary"
              onClick={handleStartRecording}
              disabled={isRecording}
            >
              Start Recording
            </Button>
            <Button
              variant="danger"
              onClick={handleStopRecording}
              disabled={!isRecording}
            >
              Stop Recording
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
