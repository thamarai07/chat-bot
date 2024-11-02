import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./gridViewComponent.scss";
import { Image } from "components";
import { Typography } from "@mui/material";
import studyAbroardImages from "assets/studyabroad";

const classes = {
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 20,
    height: "100%",
    textAlign: "center",
    color: "blue",
    fontFamily: "Roboto",
    border: "0.5px  lightgray",
    borderWidth: "thin",
  },
};
const GridViewComponent = ({ data }) => {
  return (
    <div style={classes.root}>
      <Grid container spacing={0}>
        {data.map((item) => {
          return (
            <Grid item xs={12} sm={4}>
              <Paper style={classes.paper}>
                <Image
                  src={studyAbroardImages[item.image]}
                  className={item.imageClass}
                ></Image>
                <div className="">
                  <Typography variant="h4" className={`h4 ${item.titleClass}`}>
                    {item.title}
                  </Typography>
                  <div className="body-container">
                    <p className={item.bodyClass}>{item.body}</p>
                  </div>
                </div>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default GridViewComponent;
