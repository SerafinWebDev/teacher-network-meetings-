import { MySQLqueryToDatabase } from "@/services/connector";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Home() {
  const item = await MySQLqueryToDatabase(
    `SELECT * FROM app_basic_training_units WHERE u_type = 'ssnid'; `
  );

  const dataObj = JSON.parse(item);

  const list = dataObj.rows;
  const rowsToShow = [];
  const now = Date.now();

  const formatDate = (date) => {
    return date.toLocaleDateString();
  }


  list.forEach((meet) => {
    const tmieTo = new Date(meet.to_at);

    const maxShow = tmieTo.getTime();




    console.log(maxShow);
    if (maxShow >= now) {

      meet.join_to = formatDate(new Date(meet.join_to))
      meet.from_at = formatDate(new Date(meet.from_at))
      meet.linkUrl = `https://www.womkat.edu.pl/sieci-nauczycieli-i-dyrektorow/szczegoly,${meet.slug},${meet.cmsid}`
      rowsToShow.push(meet);
      console.log(meet.u_title);
    }
  });

  const meetingToShow = rowsToShow.map((el) => {
    return (
      <div className="bordered-card btu_card w-full">
        <div className="column2 w-full flex flex-wrap">
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
            {el.slug ? (
              <a
                className="button"
                href={el.linkUrl}
                target="_top"
              >
                Więcej
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className=" min-h-screen p-8 pb-20 sm:p-20 min-w-screen ">
      <main className="flex gap-[32px] items-center w-full">
        {JSON.stringify(rowsToShow[0])}
      </main>
      <main className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {meetingToShow}
      </main>
    </div>
  );
}
