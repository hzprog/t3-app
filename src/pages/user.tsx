import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import { useState } from "react";
import { Card } from "../components/Card";

const UserPage: NextPage = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");

  const utils = api.useContext();
  const { data: users, isLoading } = api.user.getAll.useQuery();
  const { mutate: createUser } = api.user.create.useMutation({
    onSuccess: async () => {
      await utils.user.getAll.invalidate();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser({ name, age, job, email });
  };

  return (
    <>
      <Head>
        <title>users</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-8 ">
        <form onSubmit={onSubmit} className="mb-8 ">
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <h1 className="font-bold">Add New User</h1>
            </div>
            <div className="my-2">
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-sm border-2 border-black px-2 py-1"
              />
            </div>
            <div className="my-2">
              <input
                type="number"
                placeholder="age"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="rounded-sm border-2 border-black px-2 py-1"
              />
            </div>
            <div className="my-2">
              <input
                type="text"
                placeholder="job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className="rounded-sm border-2 border-black px-2 py-1"
              />
            </div>
            <div className="my-2">
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-sm border-2 border-black px-2 py-1"
              />
            </div>

            <button
              type="submit"
              className="w-auto rounded-md bg-emerald-700 px-5 py-2 text-white"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="flex flex-col space-y-2">
          {users
            ? users.map((user) => <Card user={user} key={user.id} />)
            : null}
        </div>
      </div>
    </>
  );
};

export default UserPage;