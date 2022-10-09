import Job from "../job/Job";
import JobExecutionDetail from "./JobExecutionDetail";
import { JobExecutionType } from "./JobExecutionType";

export default class JobExecution {
  id: number = 0;
  jobExecutionType: JobExecutionType = 0;
  jobExecutionTypeName: string = "";
  jobName: string = "";
  job?: Job;
  startDate?: Date;
  endDate?: Date;
  logs: JobExecutionDetail[] = [];
}
