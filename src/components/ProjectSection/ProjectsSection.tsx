import React, { useState, useEffect } from "react";
import FullScreenSection from "../FullScreenSection/FullScreenSection";
import { Box, Heading } from "@chakra-ui/react";
import { Card } from "../Card";
import { useTranslation } from "react-i18next";
import useFetch from "../../hooks/useFetch";

const ProjectsSection = () => {
  const { t } = useTranslation();
  const { response } = useFetch({url: 'data/projects.json'});

  return (
    <FullScreenSection
      backgroundColor="green.600"
      isDarkBackground
      p={8}
      alignItems="flex-start"
      spacing={8}
    >
      <Heading as="h1" id="projects-section">
        {t("header-projects")}
      </Heading>
      <Box
        display="grid"
        gridTemplateColumns="repeat(2,minmax(0,1fr))"
        gridGap={8}
      >
        {
          response?.length && response.map(({ title, description, imageSrc }) => (
          <Card
            key={ title }
            title={ title }
            description={ description }
            imageSrc={ imageSrc }
          />
        ))}
      </Box>
    </FullScreenSection>
  );
};

export default ProjectsSection;
