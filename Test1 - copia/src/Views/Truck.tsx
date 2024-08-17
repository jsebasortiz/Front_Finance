
import TruckTable from "../Components/Truck/TruckTable"
import { Text } from "@mantine/core"
import classes from "../Components/TablesHeader.module.css"
import { AnimatePresence } from "framer-motion"

function Truck() {
  //const [truckData, setTruckData] = useState(trucksTestData)
//const [truckData, setTruckData] = useState<TruckType[]>([])


    return (
    <main style={{ backgroundColor: '#e9ebf7', padding: '1rem 0rem 1rem 1rem' }}>
      <AnimatePresence mode="popLayout">
        <article className={classes.routeArticle}>
          <Text c={'black'} fs={"italic"} fw={500} ml={"xl"} mt={"xs"} size={"2rem"}>Camiones</Text>
          <TruckTable />
        </article>
      </AnimatePresence>
    </main >
  )
}

export default Truck
