import useStyles from "./styles";
import { Typography } from "@material-ui/core";

const Title = ({ title }) => {
    const classes = useStyles();

    return <Typography variant={"h3"} className={classes.title}>{title}</Typography>;
}

export default Title;