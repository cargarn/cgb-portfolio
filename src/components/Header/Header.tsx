import React, { useCallback, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import { Box, HStack } from "@chakra-ui/react";
import { LanguageSelector } from "../LanguageSelector";

const Header = () => {
  const { t } = useTranslation();
  const [y, setY] = useState(window.scrollY);
  const ref = useRef<HTMLDivElement>(null);

  const socials = [
    {
      icon: faEnvelope,
      url: "mailto: cgarnacho92@gmail.com",
    },
    {
      icon: faGithub,
      url: "https://github.com/cargarn",
    },
    {
      icon: faLinkedin,
      url: "https://www.linkedin.com/in/carlosgb1992",
    },
    {
      icon: faMedium,
      url: "https://medium.com",
    },
    {
      icon: faStackOverflow,
      url: "https://stackoverflow.com",
    },
  ];
  
  const personalLinks = [
    {
      text: t("header-projects"),
      url: "projects",
    },
    {
      text: t("header-contactme"),
      url: "contactme",
    },
  ];

  const handleClick = (anchor: string) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleScroll = useCallback((e: any) => {
    if (!ref?.current?.style) {
      return;
    }
    const window = e.currentTarget;
    if (y > window.scrollY) {
      ref.current.style.transform = "translateY(0)";
    } else if (y < window.scrollY) {
      ref.current.style.transform = "translateY(-200px)";
    }
    setY(window.scrollY);
  }, [y]);

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      ref={ ref }
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={8}>
            {
              socials.map(({ icon, url }) => (
                <a key={ url } href={ url } target="_blank" rel="noreferrer"><FontAwesomeIcon icon={ icon } size="2x" /></a>
              ))
            }
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              {
                personalLinks.map(({ text, url }) => (
                  <a href={`#${url}`} onClick={handleClick(url)} key={ url }>{ text }</a>
                ))
              }
              <div>|</div>
              <LanguageSelector/>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
