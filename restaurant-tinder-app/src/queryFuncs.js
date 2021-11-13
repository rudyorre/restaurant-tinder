//MongoClient Initializer
/*
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://CS35L:vOvq6tpjm9h2UMay@web-app.tmo7a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
await client.close();
*/


//create UserInfo
async function createUser(client, newUser){
    const result = await client.db("Restaurant-Tinder").collection("UserInfo").insertOne(newUser);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

//create Liked
async function createLiked(client, newLiked){
    const result = await client.db("Restaurant-Tinder").collection("Liked").insertOne(newLiked);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

//create Disliked
async function createDisliked(client, newDisliked){
    const result = await client.db("Restaurant-Tinder").collection("Disliked").insertOne(newDisliked);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

//create Filter
async function createFilter(client, newFilter){
    const result = await client.db("Restaurant-Tinder").collection("Filter").insertOne(newFilter);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

//Find all Liked for User and stores into array 
async function findLiked(client, username){
    info = client.db("Restaurant-Tinder").collection("Liked").find(
        {
            email: username,
        });
    const results = await info.toArray();
    return results;
}

//Find all disLiked for User and stores into array 
async function findDisliked(client, username){
    info = client.db("Restaurant-Tinder").collection("Disliked").find(
        {
            email: username,
        });
    const results = await info.toArray();
    return results;
}

//Find all Previous Filters for User and stores into array 
async function findFilter(client, username){
    info = client.db("Restaurant-Tinder").collection("Filter").find(
        {
            email: username,
        });
    const results = await info.toArray();
    return results;
}

//find if User exists
async function findUser(client, username){
    info = client.db("Restaurant-Tinder").collection("UserInfo").find(
        {
            email: username,
        });
    const results = await info.toArray();
    return results;
}

//Check if user email matches password
async function checkUser(client, username){
    info = client.db("Restaurant-Tinder").collection("UserInfo").find(
        {
            email: username,
            Password: password
        });
    const results = await info.toArray();
    return results;
}

//update password (no need to update username)
async function updatePassword(client, username, oldPassword, newPassword) {
    const result = await client.db("Restaurant-Tinder").collection("UserInfo")
                        .updateOne({ email: username, Password: oldPassword }, { $set: {Password: newPassword} });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

//deletes all tuples that match criteria
//store data into array
async function deleteLiked(client, username, arrOfLiked) {
    const result = await client.db("Restaurant-Tinder").collection("Liked")
        .deleteMany({ email: username, "Likes": { $in: arrOfLiked } });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

//deletes all tuples that match criteria
//store data into array
async function deleteDisliked(client, username, arrOfDisliked) {
    const result = await client.db("Restaurant-Tinder").collection("Disliked")
        .deleteMany({ email: username, "Dislikes": { $in: arrOfDisliked } });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

module.exports = {createUser, createLiked, createDisliked, createFilter, findDisliked, findLiked,
    findFilter, findUser, checkUser, updatePassword, deleteLiked, deleteDisliked};