import UserTable from "../Components/User/UserTable"
import { Text } from "@mantine/core"
import classes from "../Components/TablesHeader.module.css"
import { AnimatePresence } from "framer-motion"

function User() {

  return (
    <main style={{ backgroundColor: '#e9ebf7', padding: '1rem 0rem 1rem 1rem' }}>
      <AnimatePresence mode="popLayout">
        <article className={classes.routeArticle}>
          <Text c={'black'} fs={"italic"} fw={500} ml={"xl"} mt={"xs"} size={"2rem"}>Técnicos</Text>
          <UserTable />
        </article>
      </AnimatePresence>
    </main >
  )
}

export default User
