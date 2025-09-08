import { MySQLqueryToDatabase } from "@/services/connector";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Home() {
  const item = await MySQLqueryToDatabase(
    `SELECT * FROM app_basic_training_units WHERE u_type = 'ssnid'; `
  );

  const dataObj = JSON.parse(item);

  const list = dataObj.rows;
  const rowsToShow:{id: string; u_title: string; from_at:string; join_to: string; slug: string; linkUrl: string;}[] = [];
  const now = Date.now();

  const formatDate = (date:Date) => {
    const value = date.toLocaleString("pl");
    return value.substring(0, value.length - 3); //.toLocaleDateString();
  };

  list.forEach((meet) => {
    const tmieTo = new Date(meet.to_at);

    const maxShow = tmieTo.getTime();
    if (maxShow >= now) {
      meet.join_to = formatDate(new Date(meet.join_to));
      meet.from_at = formatDate(new Date(meet.from_at));
      meet.to_at = formatDate(new Date(meet.to_at));
      meet.linkUrl = `https://www.womkat.edu.pl/sieci-nauczycieli-i-dyrektorow/szczegoly,${meet.slug},${meet.cmsid}`;
      rowsToShow.push(meet);
    }
  });

  const meetingToShow = rowsToShow.map((el) => {
    return (
      <div className="bordered-card btu_card w-full " key={`siec-n-i-d-${el.id}`}>
        <div className="column2 w-full flex flex-wrap">
          <div className="content">
            <h2>{el.u_title}</h2>
            <div className="flexbox">
              <div className="col mt-2">
                <h4>
                  Data: <span className="redText">{el.from_at}</span>{" "}
                </h4>
              </div>
              <div className="col mt-2">
                <h4>
                  Data nadsyłania zgłoszeń:{" "}
                  <span className="redText">{el.join_to}</span>
                </h4>
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
              <a className="button" href={el.linkUrl} target="_top">
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
    <div className="min-h-full p-8 pb-20 sm:p-20 min-w-full ">
      <main className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {meetingToShow}
      </main>
    </div>
  );
}
