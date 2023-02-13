import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "../FullScreenSection/FullScreenSection";
import { useGeneralContext } from "../../context/generalContext";
import { useTranslation } from "react-i18next";

const LandingSection = () => {
  const { t } = useTranslation();
  const { authorShortName } = useGeneralContext();

  return (<FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  > 
    <VStack>
      <Avatar src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=C+G"></Avatar>
      <Heading size="sm">{ t("landingsection-greeting", {authorShortName}) }</Heading>
      <Heading>{ t("landingsection-bio1") }</Heading>
      <Heading>{ t("landingsection-bio2") }</Heading>
    </VStack>
  </FullScreenSection>);
};

export default LandingSection;
