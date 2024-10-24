exports.up = function(knex) {
    return knex.schema
    .createTable("book_inventory", (table) => {
      table.increments("Entry_id").primary();
      table.string("Title").notNullable();
      table.string("Author").notNullable();
      table.string("Genre").notNullable();
      table.date("Publication_Date").notNullable();
      table.string("ISBN").notNullable();
      table.string("BookImage")
    })
  
};
exports.down = function(knex) {
    return knex.schema.dropTable("book_inventory")
};
