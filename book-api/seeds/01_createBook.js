exports.seed = async function (knex) {
  await knex("book_inventory").del();
  await knex("book_inventory").insert([
    {
      Entry_id: 1,
      Title: "Let us C",
      Author: "John Week",
      Genre: "Technology",
      Publication_Date: "2013-2-1",
      ISBN:"899653"
    },
    {
      Entry_id: 2,
      Title: "C++",
      Author: "John Week",
      Genre: "Technology",
      Publication_Date: "2019-2-1",
      ISBN:"899659"
    },
    {
      Entry_id: 3,
      Title: "Java",
      Author: "Brown Gin",
      Genre: "Technology",
      Publication_Date: "2011-2-1",
      ISBN:"899657"
    },
    {
      Entry_id: 4,
      Title: "Java",
      Author: "Krisan Barreto",
      Genre: "Technology",
      Publication_Date: "2017-2-1",
      ISBN:"899658"
    },
  ]);
};
