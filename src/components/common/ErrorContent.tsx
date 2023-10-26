import {
    Card,
    CardContent,
    Divider,
    IconButton,
    Tooltip,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { Iconly } from "react-iconly";
  import { Loop } from "@mui/icons-material";
  
  interface ErrorContentType {
    icon?: string;
    title?: string;
    data?: unknown[];
    headerTitle?: string;
    className?: string;
    description?: string;
    header?: React.ReactNode;
    children?: React.ReactNode;
    onReload?: () => void;
  }
  
  function ErrorContent(props: ErrorContentType): JSX.Element {
    const {
      icon,
      title,
      header,
      headerTitle,
      description,
      children,
      onReload,
      ...rest
    } = props;
  
    return (
      <Card variant="outlined" {...rest}>
        <CardContent>
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
          <div className="flex justify-center items-center flex-col min-h-[300px] w-full">
            {header}
            <IconButton size="large" disabled>
              <Iconly filled name={icon} set="bold" size={30} />
            </IconButton>
            <Typography
              variant="body1"
              className="mt-4 text-center"
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
  
            {onReload && (
              <div>
                <Tooltip title="Refresh">
                  <IconButton size="large" onClick={onReload} title="Refresh">
                    <Loop fontSize="large" />
                  </IconButton>
                </Tooltip>
              </div>
            )}
  
            <div className="w-full max-w-xs mt-4 inline-flex justify-center">
              {children}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  ErrorContent.defaultProps = {
    icon: "Danger",
    variant: "error",
    title: "Something went wrong",
    description: "We're quite sorry about this!",
  };
  
  export default ErrorContent;
  