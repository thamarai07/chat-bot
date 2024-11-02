import React from "react";
import { Paper, Grid, Typography, Hidden } from "@mui/material";

import "./itStaffing.scss";
import dummyCompany from "../../assets/dummyCompany.png";
import { Button, Image } from "../../components";
import { useNavigate } from "react-router";

export const JobListCard = ({ jobItem, isMyJobs }) => {
  const navigate = useNavigate();
  return <>
    <Paper className={"job-container-paper"}>
      <Grid className="job-details-card">
        <div className="d-flex fullWidth">
          <div className="col-6 col-md-3 p-2">
            <Image
              src={jobItem.jobcardImage ? jobItem.jobcardImage : dummyCompany}
              alt="company Image"
              className="companyImage"
            />
          </div>
          <div className="col-6 col-md-9 p-2">
            <div>
              <Grid>
                <Typography variant="h5" className="job_title" >{jobItem.title}</Typography>
              </Grid>
              <Typography variant="body1" className="job-description">
                {jobItem.description}
              </Typography>
            </div>
            <Hidden mdDown>
              <div>
                <RenderJobDetailsSection jobItem={jobItem} isMyJobs={isMyJobs} navigate={navigate} />
              </div>
            </Hidden>
          </div>
        </div>
        <Hidden smUp>
          <div>
            <RenderJobDetailsSection jobItem={jobItem} isMyJobs={isMyJobs} navigate={navigate} />
          </div>
        </Hidden>
      </Grid>
    </Paper>
  </>;
};

const RenderJobDetailsSection = ({ jobItem, isMyJobs, navigate }) => {
  return <>
    <Grid className="jobCard-bottom d-flex justify-content-between">
      <div className="d-flex col-8">
        <Grid className="sal-exp-op-container">
          <Typography variant={"body1"} className="experience-num h3">
            <strong>{jobItem.experience}</strong>
          </Typography>
          <Typography variant={"body1"} className="sal-exp-op-label">
            Experience
          </Typography>
        </Grid>
        <Grid className="sal-exp-op-container">
          <Typography variant={"body1"} className="salary-amt h3">
            <strong>{jobItem.salary}</strong>
          </Typography>
          <Typography variant={"body1"} className="sal-exp-op-label">
            salary
          </Typography>
        </Grid>
        <Grid>
          <Typography variant={"body1"} className="openings-count h3">
            <strong>{jobItem.openings}</strong>
          </Typography>
          <Typography variant={"body1"} className="sal-exp-op-label">
            Openings
          </Typography>
        </Grid>
      </div>
      <div className="col-4">
        <Button
          style={{ alignSelf: "center" }}
          variant="contained"
          className={"gradientButton"}
          label={isMyJobs ? "View Job Details" : "Apply Now"}
          onClick={() => {
            navigate("job/id/" + jobItem.id);
          }}
        />
      </div>
    </Grid>
  </>
}


// const test = <Paper className={"job-container-paper"}>
//   <Grid className="job-details-card">
//     <Grid className="padding1rem fullWidth sal-exp-op-container">
//       <Grid className="jobCard-bottom">
//         <Grid className="jobDetails-sec">
//           <Grid className="sal-exp-op-container">
//             <Typography variant={"body1"} className="experience-num ">
//               <strong>{jobItem.experience}</strong>
//             </Typography>
//             <Typography variant={"body1"} className="sal-exp-op-label">
//               Experience
//             </Typography>
//           </Grid>
//           <Grid className="sal-exp-op-container">
//             <Typography variant={"body1"} className="salary-amt">
//               <strong>{jobItem.salary}</strong>
//             </Typography>
//             <Typography variant={"body1"} className="sal-exp-op-label">
//               salary
//             </Typography>
//           </Grid>
//           <Grid>
//             <Typography variant={"body1"} className="openings-count">
//               <strong>{jobItem.openings}</strong>
//             </Typography>
//             <Typography variant={"body1"} className="sal-exp-op-label">
//               Openings
//             </Typography>
//           </Grid>
//         </Grid>
//         <Button
//           style={{ alignSelf: "center" }}
//           variant="contained"
//           // className={"apply-now"}
//           className={"gradientButton apply-now-btn"}
//           label={isMyJobs ? "View Job Details" : "Apply Now"}
//           onClick={() => {
//             navigate("job/id/" + jobItem.id);
//           }}
//         />
//       </Grid>
//     </Grid>
//   </Grid>
// </Paper>

export default JobListCard;
