import { Row, IconButton } from "@once-ui-system/core";
import { social } from "@/resources";
import { WeChatQRCard } from "./WeChatQRCard";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="center"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
      >
        <Row gap="32">
          {social.map((item) => {
            if (!item.link) return null;
            const button = (
              <IconButton
                key={item.name}
                href={item.link}
                icon={item.icon}
                tooltip={item.name === "WeChat" ? undefined : item.name}
                size="s"
                variant="ghost"
              />
            );
            return item.name === "WeChat" ? (
              <WeChatQRCard key={item.name}>{button}</WeChatQRCard>
            ) : (
              button
            );
          })}
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
