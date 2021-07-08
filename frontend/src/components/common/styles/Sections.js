import {makeStyles} from "@material-ui/core/styles";

export const sectionStyle = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));