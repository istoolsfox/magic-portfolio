import { Row, IconButton, Text } from "@once-ui-system/core";
import { social } from "@/resources";
import { WeChatQRCard } from "./WeChatQRCard";
import styles from "./Footer.module.scss";
import Image from "next/image";

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
      <Row
        fillWidth
        paddingY="16"
        paddingX="16"
        horizontal="center"
        vertical="center"
        s={{ direction: "column", align: "center" }}
      >
        <Text variant="body-default-s" onBackground="neutral-weak">
          © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SITE_NAME || "ToolsFox"}. All rights reserved.
        </Text>
        <Row gap="8" vertical="center" horizontal="center">
          <Text variant="body-default-s" onBackground="neutral-weak">
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              京ICP备2024051234号-1
            </a>
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            |
          </Text>
          <Row gap="4" vertical="center" horizontal="center">
            <Image 
              src="/images/beian-icon.svg" 
              alt="备案图标" 
              width="16" 
              height="16" 
            />
            <a 
              href="https://beian.mps.gov.cn/#/query/webSearch?code=33010902004850" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              浙公网安备33010902004850号
            </a>
          </Row>
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
