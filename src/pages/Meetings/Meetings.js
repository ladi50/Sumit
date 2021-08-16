import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@material-ui/core";
import Store from "../../store/context";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import Title from "../../components/Title/Title";
import Meeting from "../../components/Meeting/Meeting";
import useStyles from "./styles";

const Meetings = () => {
    const { meetings, loading, error, getMeetings } = useContext(Store);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        getMeetings(history);
    }, [getMeetings, history]);

    if (loading) return <Spinner />;
    if (error) return <Error message={error} />;

    return (
        <div>
            <Title title={"Meetings"} />

            {
                meetings?.length > 0 ?
                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Meeting Length</TableCell>
                                    <TableCell>Participants</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {meetings.map((meeting, index) => <Meeting key={index} meeting={meeting} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <div style={{ marginLeft: "20px", fontSize: "20px" }}>Meetings are empty</div>
            }
        </div>
    );
};

export default Meetings;