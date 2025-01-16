import styles from "./styles.module.scss";
const Block = ({
  title,
  description,
  icon,
  onClick,
  _id,
  disabled = false,
  type = "single",

  selectedItems,
  setSelectedItems,
}) => {
  const shouldHideCheckbox = type === "single" && selectedItems?.length > 0 && selectedItems?.some((item) => item._id !== _id)
  const currentItem = selectedItems?.find((item) => item?._id === _id)
  const selected = currentItem?.selected

  const selectItem = (item, _id, type) => {
    let newArr
    if (type === "single") {
      const currentItem = selectedItems.find((obj) => obj._id === _id)
      if (currentItem) {
        newArr = selectedItems.filter((obj) => obj._id !== _id)
      } else {
        newArr = [{ selected: item, _id, type }]
      }
    } else {
      newArr = [...selectedItems]
      let checkIfSingleExist = newArr?.some((obj) => obj.type === "single")
      if(checkIfSingleExist) {
        newArr = newArr.filter((obj) => obj.type !== "single")
      }
      const index = newArr.findIndex((obj) => obj._id === _id)
      if (index !== -1) {
        newArr.splice(index, 1)
      } else {
        newArr.push({ selected: item, _id, type })
      }
    }
    setSelectedItems(newArr)
  }

  return (
    <button
      className={`${styles.block} ${selected ? styles.active : ""} ${disabled ? styles.disabled : ""}`}
      type="button"
      onClick={() => {
        selectItem(true, _id, type)
      }}
    >
      {
        !shouldHideCheckbox && (
          selected && <div className={styles.grouppedCheckbox}>✓</div>
        )
      }
      <div className={styles.blockIcon}>
        <img src={icon} alt={title} />
      </div>
      <div className={styles.blockContent}>
        <div className={styles.blockTitle}>{title}</div>
        <div className={styles.blockDescription}>{description}</div>
      </div>
    </button>
  );
};
export default Block;
