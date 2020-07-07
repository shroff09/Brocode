import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Rating from '@material-ui/lab/Rating';
import {Box} from "@material-ui/core";

const Collaborator = (props) => {
    const {name, aboutMe, rating, onClick} = props;

    const useStyles = makeStyles({
        card: {
            width: 345,
            minHeight: 200,
            margin: 10,
            padding: 10
        },
        cardContent: {
            backgroundColor: '#f5f5f5'
        },
        media: {
            height: 140,
        },
    });

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        <div className='d-flex flex-row justify-content-between'>
                            {name}
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Rating name="read-only" value={rating} readOnly />
                            </Box>
                        </div>

                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {aboutMe}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => onClick(name)}>
                    Join
                </Button>
            </CardActions>
        </Card>
    );
};

export default Collaborator;