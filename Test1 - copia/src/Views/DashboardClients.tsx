import { useState } from "react"
import ClientTable from "../Components/DashboardClients/ClientTable/ClientTable"
import CollectTable from "../Components/DashboardClients/CollectTable/CollectTable"
import RecipientsTable from "../Components/DashboardClients/RecipientTable/RecipientTable"
import { AnimatePresence, motion } from "framer-motion"
import { Divider, Text } from "@mantine/core"
import classes from "../Components/TablesHeader.module.css"

function DashBoardClient() {
  const [clientId, setClientId] = useState<number>(0)

  const [collectId, setCollectId] = useState<string>("")

  
  return (
    <main key={"DashBoardClient"} style={{ backgroundColor: '#e9ebf7', padding: '1rem 0rem 1rem 1rem' }}>
      <AnimatePresence key={"AnimateDashBoardClient"} mode="popLayout">
        <article key={"QueryDashBoardClient"} className={classes.routeArticle}>
          <Text key={"textClient"} c={'black'} fs={"italic"} fw={500} ml={"xl"} mt={"xs"} size={"2rem"}>Clientes</Text>
          <ClientTable key={"client"} clientId={clientId} setClientId={setClientId} />

          <motion.div layout>
            <Divider size={"xl"} mt={"xl"} />
          </motion.div>

          <Text key={"textCollect"} c={'black'} fs={"italic"} fw={500} ml={"xl"} mt={"xl"} mb={"xl"} size={"2rem"}>Aforos</Text>
          <CollectTable key={"collect"} clientId={clientId} setCollectId={setCollectId} />

          <motion.div layout>
            <Divider size={"xl"} mt={"xl"} />
          </motion.div>

          <Text key={"textRecipient"} c={'black'} fs={"italic"} fw={500} ml={"xl"} mt={"xl"} mb={"xl"} size={"2rem"}>Recipientes</Text>
          <RecipientsTable key={"recipient"} collectId={Number(collectId)} />
        </article>
      </AnimatePresence>
    </main >
  )
}

export default DashBoardClient 