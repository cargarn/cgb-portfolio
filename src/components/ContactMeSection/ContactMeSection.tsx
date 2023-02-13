import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import { FullScreenSection } from "../FullScreenSection";
import useSubmit from "../../hooks/useSubmit/useSubmit";
import { useAlertContext } from "../../context/alertContext";
import { useTranslation } from "react-i18next";

const initialValues = {
  firstName: "",
  email: "",
  type: "",
  comment: "",
};

const ContactMeSection = () => {
  const { t } = useTranslation();
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const ContactMeSchema = Yup.object().shape({
    firstName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    email: Yup.string().email().required("Email is required"),
    comment: Yup.string().required("Comment is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (data) => {
      submit(null, data);
    },
    validationSchema: ContactMeSchema,
  });

  useEffect(() => {
    response && response.type && response.message && onOpen(response.type, response.message);
  }, [response]);

  return (
    <FullScreenSection
      isDarkBackground
      background="linear-gradient(#e66465, #9198e5);"
      py={16}
      spacing={8}
      width="100%"
    >
      <VStack width="80%" p={16} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
        {t("header-contactme")}
        </Heading>
        <Box rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!formik.errors.firstName}>
                <FormLabel htmlFor="firstName">{t("form-firstname")}</FormLabel>
                <Input
                  id="firstName"
                  {...formik.getFieldProps("firstName")}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!formik.errors.email}>
                <FormLabel htmlFor="email">{t("form-email")}</FormLabel>
                <Input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">{t("form-enquirytype")}</FormLabel>
                <Select 
                  id="type"
                  {...formik.getFieldProps("type")}
                >
                  <option value="hireMe">{t("form-freelance")}</option>
                  <option value="openSource">{t("form-opensource")}</option>
                  <option value="other">{t("form-other")}</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={!!formik.errors.comment}>
                <FormLabel htmlFor="comment">{t("form-yourmessage")}</FormLabel>
                <Textarea
                  id="comment"
                  height={200}
                  {...formik.getFieldProps("comment")}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button disabled={isLoading} type="submit" colorScheme="purple" width="full">
                {t("form-submit")}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default ContactMeSection;
