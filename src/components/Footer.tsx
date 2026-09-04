import { Row, IconButton, Text } from "@once-ui-system/core";
import { social } from "@/resources";
import { WeChatQRCard } from "./WeChatQRCard";
import styles from "./Footer.module.scss";
import Image from "next/image";

export const Footer = () => {
  return (
    <Row
      as="footer"
      fillWidth
      direction="column"
      horizontal="center"
      vertical="center"
      padding="8"
      gap="4"
      s={{ direction: "column" }}
    >
      <Row paddingY="8" paddingX="16" gap="32" horizontal="center" vertical="center">
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
      <Row
        paddingY="8"
        paddingX="16"
        gap="8"
        wrap
        horizontal="center"
        vertical="center"
        s={{ direction: "row", horizontal: "center", align: "center" }}
      >
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noreferrer"
          className={styles.beianLink}
        >
          <Image src="/images/beian.png" alt="" width={14} height={15} />
          <Text as="span" variant="label-default-s" onBackground="neutral-weak">
            浙ICP备2026047392号-1
          </Text>
        </a>
        <Row width="1" height="12" background="neutral-alpha-medium" />
        <a
          href="https://beian.mps.gov.cn/#/query/webSearch?code=33010902004850"
          target="_blank"
          rel="noreferrer"
          className={styles.beianLink}
        >
          <Image src="/images/beian.png" alt="" width={14} height={15} />
          <Text as="span" variant="label-default-s" onBackground="neutral-weak">
            浙公网安备33010902004850号
          </Text>
        </a>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
