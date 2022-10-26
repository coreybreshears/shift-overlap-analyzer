const db = require("../db");

function runFourthQuery(req, res) {
  db.query(
    "with \
      nurse_hired_per_job as (select job_id, count(nurse_id) as hired_count from nurse_hired_jobs group by job_id) \
    select jobs.facility_id, jobs.nurse_type_needed, sum(jobs.total_number_nurses_needed)-sum(nurse_hired_per_job.hired_count) as remaining_spot_count \
    from jobs \
    left join nurse_hired_per_job on jobs.job_id=nurse_hired_per_job.job_id \
    group by jobs.facility_id, jobs.nurse_type_needed \
    order by jobs.facility_id, jobs.nurse_type_needed;"
  )
    .then((spots) => {
      return res.status(200).json({ spots: spots[0] });
    })
    .catch((err) => {
      return res.status(400).json({});
    });
}

function runFifthQuery(req, res) {
  db.query(
    "with \
      nurse_hired_per_job as (select job_id, count(nurse_id) as hired_count from nurse_hired_jobs group by job_id), \
      remaining_jobs as (select jobs.job_id, jobs.nurse_type_needed \
        from jobs left join nurse_hired_per_job on jobs.job_id=nurse_hired_per_job.job_id \
        where jobs.total_number_nurses_needed>nurse_hired_per_job.hired_count order by jobs.job_id) \
    select nurse_id, nurse_name, nurse_type, \
          (select count(job_id) \
          from remaining_jobs \
          where nurse_type_needed=nurses.nurse_type and \
              (select count(job_id) \
              from nurse_hired_jobs \
              where job_id=remaining_jobs.job_id and nurse_id=nurses.nurse_id \
              )=0 \
          ) \
    from nurses \
    order by nurse_id;"
  )
    .then((nurses) => {
      return res.status(200).json({ nurses: nurses[0] });
    })
    .catch((err) => {
      return res.status(400).json({});
    });
}

function runSixthQuery(req, res) {
  db.query(
    "with \
      target_nurse as (select nurse_id from nurses where nurses.nurse_name='Anne'), \
      hired_facilities as ( \
        select facility_id \
        from jobs \
        left join nurse_hired_jobs on jobs.job_id=nurse_hired_jobs.job_id \
        cross join target_nurse \
        where nurse_hired_jobs.nurse_id=target_nurse.nurse_id \
        group by facility_id \
      ) \
    select nurse_hired_jobs.nurse_id, nurses.nurse_name \
    from nurse_hired_jobs \
    left join jobs on nurse_hired_jobs.job_id=jobs.job_id \
    left join nurses on nurse_hired_jobs.nurse_id=nurses.nurse_id \
    cross join target_nurse \
    where jobs.facility_id in (select * from hired_facilities) and nurse_hired_jobs.nurse_id<>target_nurse.nurse_id \
    group by nurse_hired_jobs.nurse_id, nurses.nurse_name;"
  )
    .then((coworkers) => {
      return res.status(200).json({ coworkers: coworkers[0] });
    })
    .catch((err) => {
      return res.status(400).json({});
    });
}

module.exports = {
  runFourthQuery,
  runFifthQuery,
  runSixthQuery,
};
