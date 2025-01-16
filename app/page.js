"use client";
import styles from "./styles.module.scss";
import Block from "./components/Block";
import { useEffect, useState } from "react";
import { baseUrl } from "./utils/baseUrl";
export default function Home() {
  const [data, setNewData] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [loading, setLoading] = useState(false)


  const getData = async () => {
    try {
      const res = await fetch(`${baseUrl}/blocks`)
      const data = await res.json()
      setNewData(data?.blocks)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    let blockId = selectedItems.map((item) => item._id)

    fetch(`${baseUrl}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blockId })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setLoading(false)
        setSelectedItems([])
        alert('Submitted Successfully')
      })
      .catch(error => {
        console.error('Error:', error)
        setLoading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <main className={styles.container}>
      <div className={styles.main}>
        {data?.length > 0 ? data.map((block, index) => (
          <Block key={index} {...block} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
        )) : (
          <div>
            <span>No Data Available</span>
          </div>
        )}
      </div>
      {
        data?.length > 0 && (
          <button onClick={() => {
            handleSubmit()
          }} disabled={selectedItems?.length === 0 || loading} className={(selectedItems?.length === 0 || loading) ? styles.btnDisabled : styles.btnMain}>Submit</button>
        )
      }
    </main>
  );
}
