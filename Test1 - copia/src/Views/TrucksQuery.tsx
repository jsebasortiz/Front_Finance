import { Group, Select, Text } from "@mantine/core"
import classes from "../Components/TablesHeader.module.css"
import { AnimatePresence } from "framer-motion"
import TruckQueryTable from "../Components/TruckQuery/TruckQueryTable"
import { useEffect, useState } from "react"
import { PeriodType } from "../types/period"
import { PlateType } from "../types/plates"
import { UserType } from "../types/user"
import { CallApiGetAllPeriods } from "../API/PeriodCall/Period"
import { CallApiGetAllPlates } from "../API/TruckCall/Truck"
import { CallApiGetUsersNoPaged } from "../API/UserCall/User"

function TruckQuery() {

  const [selectedPlate, setSelectedPlate] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedUser, setSelectedUser] = useState<number>(0);

  const [plates, setPlates] = useState<PlateType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [periods, setPeriods] = useState<PeriodType[]>([]);

  useEffect(() => {
    CallApiGetAllPlates().then(data => {
      setPlates(data? data : [])
    })
    CallApiGetUsersNoPaged().then(data => {
      setUsers(data? data : [])
    })
    CallApiGetAllPeriods().then(data => {
      setPeriods(data? data : [])
    })
  }, [])


  return (
    <main style={{ backgroundColor: '#e9ebf7', padding: '1rem 0rem 1rem 1rem' }}>
      <article className={classes.routeArticle}>
        <Group grow p={"1rem"}>
          <Select
            data={plates.map(data => ({ label: data.plate, value: data.truckId.toString() }))}
            label='Placa de un Camion'
            placeholder='Filtra por placa'
            value={selectedPlate}
            onChange={(event) => setSelectedPlate(event ? event : "")}
            limit={50}
            searchable
            nothingFoundMessage="Nothing found..." />
          <Select
            data={periods.map(data => ({ label: data.name, value: data.productionPeriodId.toString() }))}
            label='Periodo'
            placeholder='Filtra por periodo'
            value={selectedPeriod}
            onChange={(event) => setSelectedPeriod(event ? event : "")}
            limit={50}
            searchable
            nothingFoundMessage="Nothing found..." />
          <Select
            data={users.map(data => ({ label: data.name, value: data.id.toString() }))}
            label='Conductor'
            placeholder='Filtra por conductor'
            value={selectedUser.toString()}
            onChange={(event) => setSelectedUser(event ? parseInt(event) : 0)}
            limit={50}
            searchable
            nothingFoundMessage="Nothing found..." />
        </Group>
      </article>
      <AnimatePresence mode="popLayout">
        <article className={classes.routeArticle}>
          <Text c={'black'} fs={"italic"} fw={500} ml={"xl"} mt={"xs"} size={"2rem"}>Consultar Camiones</Text>
          <TruckQueryTable plate={Number(selectedPlate)} period={Number(selectedPeriod)} user={selectedUser} />
        </article>
      </AnimatePresence>
    </main >
  )
}

export default TruckQuery
