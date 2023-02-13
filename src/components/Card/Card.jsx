import React from "react";
import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const Card = ({ title, description, imageSrc }) => {
  const { t } = useTranslation();

  const handleSeeMoreClick = () => {
    alert("Work in progress.");
  };

  return (
    <HStack alignItems="flex-start">
      <VStack h="full" background="white" borderRadius={20}>
        <Image src={imageSrc} borderRadius={20}/>
        <VStack h="full" p={4} alignItems="flex-start" color="black">
          <Heading size="md">{title}</Heading>
          <Text color="gray" h="full">{description}</Text>
          <Text><a href="#projects-section" onClick={handleSeeMoreClick}>{t("seemore")} <FontAwesomeIcon icon={faArrowRight} size="1x" /></a></Text>
        </VStack>
      </VStack>
    </HStack>
  );
};

export default Card;
