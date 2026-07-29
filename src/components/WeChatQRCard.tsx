"use client";

import { Column, HoverCard, Text } from "@once-ui-system/core";

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
        padding="8"
        gap="8"
        horizontal="center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/wechat-qr.jpg"
          alt="WeChat QR code"
          width={180}
          style={{ width: 180, height: "auto", borderRadius: 8, display: "block" }}
        />
        <Text variant="label-default-s" onBackground="neutral-weak">
          扫码加我微信
        </Text>
      </Column>
    </HoverCard>
  );
};
