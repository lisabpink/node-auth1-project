const db = require("../database/db-config");

module.exports = {
  find,
  add,
  findById,
  findBy
};

function find() {
  return db("users").select("id", "username");
}

function findById(id) {
    return (
      db("users")
        .where({ id })
        //what will show when user logs in
        .select("id", "username")
        .first()
    );
  }
  
  async function add(user) {
    const [id] = await db("users").insert(user, "id");
  
    return findById(id);
  }
  
  function findBy(username) {
    return db("users").where(username);
  }