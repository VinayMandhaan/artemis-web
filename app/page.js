"use client";
import styles from "./styles.module.scss";
import Block from "./components/Block";
import { useEffect, useState } from "react";
export default function Home() {
  const [data, setNewData] = useState([])
  
  const getData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blocks")
      const data = await res.json()
      setNewData(data?.blocks)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <main className={styles.container}>
      <div className={styles.main}>
        {data?.length > 0 ? data.map((block, index) => (
          <Block key={index} {...block} />
        )) : (
          <div>
            <span>No Data Available</span>
          </div>
        )}
      </div>
      {
        data?.length > 0 && (
          <button className={styles.btnMain}>Submit</button>
        )
      }
    </main>
  );
}
