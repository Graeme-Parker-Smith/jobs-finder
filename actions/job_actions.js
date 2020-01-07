import JOB_DATA from "./IndeedJobData.json";
import { FETCH_JOBS, LIKE_JOB } from "./types";
import axios from "axios";

const JOBS_ROOT_URL = "https://jobs.github.com/positions.json?";

export const fetchJobs = (region, callback) => async dispatch => {
  try {
    //let zip = await reverseGeoCode(region);
    //const url = buildJobsUrl(zip);
    const url = `${JOBS_ROOT_URL}lat=${region.latitude}&&long=${region.longitude}`;
    let { data } = await axios.get(url);
    // const data = JOB_DATA;
    // console.log(data);
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();
  } catch (e) {
    console.log(e);
  }
};

export const likeJob = job => {
  console.log(job.company);
  return {
    payload: job,
    type: LIKE_JOB
  };
};
