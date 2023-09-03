import styles from './/Header.module.scss'

export default function header() {
  return (
  <div className={styles.Header}>
    <div className={styles.header_menu}>

      <div className={styles.left_part}>
      </div>

      <div className={styles.central_part}>
        <input type="text" />
        
      </div>
      
      <div className={styles.right_part}>
      <div >написать</div>
      </div>

    </div>

  </div>
  );
}
