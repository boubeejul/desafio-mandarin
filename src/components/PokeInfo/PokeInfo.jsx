import style from './style.module.css'
import { HiMenu } from 'react-icons/hi';

export function PokeInfo(props) {

    const colors = {
        "Ice": "#A0DBDB",
        "Grass": "#83CC5E",
        "Psychic": "#F9729A",
        "Fire": "#F08336",
        "Water": "#769AF1",
        "Bug": "#AAB925",
        "Electric": "#F9D74F",
        "Rock": "#BBA441",
        "Normal": "#D9D9D9",
        "Ground": "#E2C472"
    }

    return (
        <div className={style.wrapper}>

            <div className={style.redButtons}>
                <div className={style.button}></div>
                <div className={style.button}></div>
            </div>

            <div className={style.pokemon}>
                <img src={props.selected.background_image_url} alt="imagem de fundo do pokemon" className={style.backgroundImage} />
                <img src={props.selected.image_url} alt="pokemon" className={style.pokemonImage} />
            </div>

            <div className={style.description}>

                <div className={style.left}>

                    <span>{props.selected.name}</span>
                    <div className={style.category} style={{ backgroundColor: colors[props.selected.category] }}>
                        {props.selected.category}
                    </div>

                </div>

                <div className={style.right}>
                    <HiMenu/>
                </div>
            </div>
        </div>
    )
}