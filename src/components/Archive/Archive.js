import { useContext, useState } from "react";
import { MoreVert } from "@material-ui/icons";
import { IconButton, Menu, MenuItem, TableCell, TableRow } from "@material-ui/core";
import Store from "../../store/context";

const Archive = ({ archive }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { returnFromArchive } = useContext(Store);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const returnToMeetings = (name) => {
        setAnchorEl(null);

        returnFromArchive(name);
    };

    return (
        <TableRow>
            <TableCell>{archive.name}</TableCell>
            <TableCell>{archive.meetingLength}</TableCell>
            <TableCell>{archive.participants.length}</TableCell>
            <TableCell>{archive.date}</TableCell>
            <TableCell>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVert />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem onClick={() => returnToMeetings(archive.name)}>Return to meetings</MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    )
};

export default Archive;