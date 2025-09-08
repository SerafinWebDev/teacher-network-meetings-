import { MySQLqueryToDatabase } from "@/services/connector";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Home() {
  const item = await MySQLqueryToDatabase(
    `SELECT * FROM app_basic_training_units WHERE u_type = 'ssnid'; `
  );
  const dataObj = JSON.parse(item);
  console.log(dataObj.rows);

  const list = dataObj.rows;
  const rowsToShow = [];

  const now = Date.now();

  list.forEach((meet) => {
    const time2 = new Date(meet.to_at);

    const maxShow = time2.getTime();
    console.log(maxShow);
    if (maxShow >= now) {
      rowsToShow.push(meet);
      console.log(meet.u_title);
    }
  });

  const meetingToShow = rowsToShow.map((el) => {
    return (
      <div className="column2">
        <div className="content">
          <h2>{el.u_title}</h2>
          <div className="flexbox">
            <div className="col">
              <h4>Data: {el.from_at} </h4>
            </div>
            <div className="col">
              <h4>Data nadsyłania zgłoszeń: {el.join_to}</h4>
            </div>
          </div>
          <div className="col">
            {/* <h4>Prowadzący:</h4>
            <div className="trainers-url">
              <a
                className="h4"
                href="/o-osrodku/kadra,anna-czarlinska-wezyk-,61"
              >
                Anna Czarlińska-Wężyk{" "}
              </a>
            </div> */}
          </div>
        </div>
        <div className="buttons-container">
          {el.slug ?  <a className="button" href={`https://www.womkat.edu.pl/${el.slug}`} target="_top">
            Więcej
          </a> : '' }         
        </div>
      </div>
    );
  });
  

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {JSON.stringify(rowsToShow[0])}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {meetingToShow}
      </footer>
    </div>
  );
}
