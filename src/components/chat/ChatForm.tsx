"use client";

import { useRef, useState } from "react";
import { Button, Column, Input, Row, Text, Textarea } from "@once-ui-system/core";

export const ChatForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Read actual DOM values at submit time: immune to autofill/IME
    // not firing React onChange events
    const name = nameRef.current?.value.trim() ?? "";
    const email = emailRef.current?.value.trim() ?? "";
    const message = messageRef.current?.value.trim() ?? "";
    if (!name || !email || !message) {
      setStatus("error");
      setFeedback("请填写称呼、邮箱和想说的话");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setFeedback("邮箱格式不正确");
      return;
    }
    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("sent");
        setFeedback("已发送！我会尽快回复你 🦊");
        if (nameRef.current) nameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (messageRef.current) messageRef.current.value = "";
      } else {
        setStatus("error");
        setFeedback(data.error || "发送失败，请稍后再试");
      }
    } catch {
      setStatus("error");
      setFeedback("网络出了点问题，请稍后再试");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Column fillWidth gap="16">
        <Row fillWidth gap="16" s={{ direction: "column" }}>
          <Input id="chat-name" label="你的称呼 *" ref={nameRef} maxLength={100} />
          <Input id="chat-email" label="你的邮箱 *" type="email" ref={emailRef} maxLength={200} />
        </Row>
        <Textarea
          id="chat-message"
          label="想说的话 *"
          lines={8}
          ref={messageRef}
          maxLength={5000}
          resize="vertical"
        />
        <Row fillWidth horizontal="end" vertical="center" gap="16">
          {feedback && (
            <Text
              variant="label-default-s"
              onBackground={status === "error" ? "danger-weak" : "success-weak"}
            >
              {feedback}
            </Text>
          )}
          <Button type="submit" size="m" arrowIcon disabled={status === "sending"}>
            {status === "sending" ? "发送中…" : "发送"}
          </Button>
        </Row>
      </Column>
    </form>
  );
};
