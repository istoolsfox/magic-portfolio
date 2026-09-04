"use client";

import { Column, Row, Text, HoverCard } from "@once-ui-system/core";

/**
 * Wraps a trigger element (icon/button) and shows the WeChat QR code on hover.
 */
export const WeChatQRCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <HoverCard placement="top" trigger={children}>
      <Column
        background="surface"
        border="neutral-alpha-medium"
        radius="l"
        shadow="l"
        padding="16"
        gap="12"
        horizontal="center"
        style={{ minWidth: 216 }}
      >
        <Row gap="8" vertical="center" horizontal="center">
          <Text variant="label-strong-s">微信联系</Text>
        </Row>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/wechat-qr.jpg"
          alt="微信二维码"
          width={200}
          style={{ width: 200, height: "auto", borderRadius: 12, display: "block" }}
        />
        <Text variant="label-default-xs" onBackground="neutral-weak" align="center">
          扫码加我微信
        </Text>
      </Column>
    </HoverCard>
  );
};
