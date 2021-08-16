import { useContext } from "react";
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
import Archive from "../../components/Archive/Archive";
import useStyles from "./styles";

const Archives = () => {
    const { loading, error, archives } = useContext(Store);
    const classes = useStyles();

    if (loading) return <Spinner />;
    if (error) return <Error message={error} />;

    return (
        <div>
            <Title title={"Archive"} />

            {
                archives?.length > 0 ?
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
                                {archives.map((archive, index) => <Archive key={index} archive={archive} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <div style={{marginLeft: "20px", fontSize: "20px"}}>Archive is empty</div>
            }
        </div>
    );
};

export default Archives;