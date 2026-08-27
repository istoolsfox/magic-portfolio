import { Row, IconButton } from "@once-ui-system/core";
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
        <Row gap="4" vertical="center" horizontal="center">
          <Image
            src="/images/beian.png"
            alt="公安备案图标"
            width={15}
            height={16}
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
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
