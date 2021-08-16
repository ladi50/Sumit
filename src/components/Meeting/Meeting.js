import { useContext, useState } from "react";
import { MoreVert } from "@material-ui/icons";
import { IconButton, Menu, MenuItem, TableCell, TableRow } from "@material-ui/core";
import Store from "../../store/context";

const Meeting = ({ meeting }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { archiveMeeting, deleteMeeting } = useContext(Store);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const approveMeeting = (name) => {
        setAnchorEl(null);
        archiveMeeting(name);
    };

    const removeMeeting = (name) => {
        setAnchorEl(null);
        deleteMeeting(name);
    };

    return (
        <TableRow>
            <TableCell>{meeting.name}</TableCell>
            <TableCell>{meeting.meetingLength}</TableCell>
            <TableCell>{meeting.participants.length}</TableCell>
            <TableCell>{meeting.date}</TableCell>
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
                    <MenuItem onClick={() => approveMeeting(meeting.name)}>Approve</MenuItem>
                    <MenuItem onClick={() => removeMeeting(meeting.name)}>Delete</MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    )
};

export default Meeting;