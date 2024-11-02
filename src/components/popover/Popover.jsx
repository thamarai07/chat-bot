import React from "react";
import { Popper, Grow, Paper, ClickAwayListener } from "@mui/material";

export const Popover = ({
	open,
	anchorEl,
	render,
	updateOpen,
	parentStyles,
}) => {
	return (
		<Popper open={open} anchorEl={anchorEl.current} role={undefined} style={{zIndex: 300}}>
			{({ TransitionProps, placement }) => (
				<Grow {...TransitionProps}>
					<ClickAwayListener
						onClickAway={() => {
							updateOpen(false);
						}}
					>
						<Paper
							className={
								parentStyles ? parentStyles.paper : "core-popOver-popOver"
							}
						>
							{render}
						</Paper>
					</ClickAwayListener>
				</Grow>
			)}
		</Popper>
	);
};
export default Popover;
