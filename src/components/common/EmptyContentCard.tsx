import {
    Card,
    CardContent,
    Divider,
    IconButton,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { Iconly } from "react-iconly";
  
  export default function EmptyContentCard(props: {
    icon?: string;
    title?: string;
    headerTitle?: string;
    description?: string;
    header?: React.ReactNode;
    variant?: "error" | "primary";
    children?: React.ReactNode;
    [key: string]: string | React.ReactNode;
  }) {
    const {
      icon,
      title,
      header,
      headerTitle,
      description,
      variant,
      children,
      ...rest
    } = props;
    return (
      <Card variant="outlined" {...rest}>
        <CardContent className="h-full">
          {headerTitle ? (
            <>
              <Typography
                variant="body1"
                className="capitalize mb-4"
                fontWeight="bold"
              >
                {headerTitle}
              </Typography>
              <Divider />
            </>
          ) : null}
          <div className="flex justify-center items-center flex-col min-h-[300px] h-full w-full">
            {header}
            <IconButton
              size="large"
              disabled
            >
              <Iconly
                filled
                name={icon}
                set="bold"
                size={30}
              />
            </IconButton>
            <Typography
              variant="body1"
              className="mt-4 items-center text-center"
              fontWeight={600}
            >
              {title}
            </Typography>
            <Typography
              className="mt-2 text-center"
              variant="body1"
              style={{ color: "#6C6C6C" }}
            >
              {description}
            </Typography>
  
            <div className="w-full max-w-xs mt-6 item inline-flex justify-center">
              {children}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  EmptyContentCard.defaultProps = {
    icon: "Paper",
    title: "Empty Content",
    variant: "error",
    description: "No data available",
  };
  