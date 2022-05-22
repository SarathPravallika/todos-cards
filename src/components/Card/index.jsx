import React, { Fragment } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { CardVariants } from "./Card.constants";
import "./Card.scss";

const BasicCard = (props) => {
  const {
    id,
    isActive,
    content,
    variant,
    activeContent,
    setActiveContent,
    handleActivateCard,
    handleSubmit,
    handleDelete,
  } = props;
  const cardClassName = `card ${
    variant === CardVariants.ADD_CARD ? "card--is-add-card" : ""
  } ${isActive ? "card--is-active" : ""}`;

  const handleChange = async (e) => {
    setActiveContent(e.target.value);
  };

  return (
    <li
      className="cards-item"
      onClick={(e) => {
        handleActivateCard(e, id);
      }}
    >
      <Card className={cardClassName}>
        {variant === CardVariants.ADD_CARD ? (
          <Button onClick={(e) => handleSubmit(e)}>Add Card + </Button>
        ) : (
          <Fragment>
            <CardActions className="card__actions">
              <IconButton
                aria-label="delete"
                onClick={(e) => handleDelete(e, id)}
              >
                <CloseIcon />
              </IconButton>
            </CardActions>

            {isActive ? (
              <TextField
                sx={{ padding: "2rem 0.5rem 0.5rem 0.5rem" }}
                id="standard-multiline-static"
                value={activeContent}
                onChange={handleChange}
                multiline
                variant="standard"
                InputProps={{ disableUnderline: true }}
              />
            ) : (
              <CardContent>{content}</CardContent>
            )}
          </Fragment>
        )}
      </Card>
    </li>
  );
};

export default BasicCard;
