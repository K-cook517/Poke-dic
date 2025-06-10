import './App.css'
import { useState, useRef, useCallback } from 'react'
import PokemonNames from './components/PokemonNames'

function App() {
   const inputRef = useRef(null)
   const [pokemons, setPoke] = useState([
      {
         id: 1,
         name: '이상해씨',
         img: `./images/이상해씨.png`,
         disabled: false,
      },
      {
         id: 2,
         name: '파이리',
         img: `./images/파이리.png`,
         disabled: false,
      },
      {
         id: 3,
         name: '꼬부기',
         img: `./images/꼬부기.png`,
         disabled: false,
      },
   ])
   const [inputName, setInputName] = useState('')
   const [nextId, setNextId] = useState(4)

   const onChange = (e) => setInputName(e.target.value)

   const onClick = () => {
      let pokemonname = inputName.trim() //.trim()= 앞뒤 공백 전체 정리포켓몬 이름에 공백 들어가도 전부 잘라내기

      //공백열 입력 방지
      if (!pokemonname) return

      // 왜니드런만한도감안ㄴ에서성별이나뉘었는가ㅠ
      if (pokemonname === '니드런') {
         const gender = prompt('등록하실 니드런의 성별을 입력해주세요(수컷 또는 암컷):')
         if (gender === '수컷') {
            pokemonname = '니드런♂'
         } else if (gender === '암컷') {
            pokemonname = '니드런♀'
         } else {
            alert('니드런의 올바른 성별을 입력해주세요!')
            return
         }
      } //와씨나천잰듯

      //관동지방 151마리만 넣을 것!
      if (!PokemonNames.includes(pokemonname)) {
         alert('해당 포켓몬은 도감에 존재하지 않습니다.')
         return
      }

      //중복금지!!
      if (pokemons.some((p) => p.name === pokemonname)) {
         alert('이미 도감에 등록된 포켓몬입니다.')
         return
      }

      const nextPoke = pokemons.concat({
         id: nextId,
         name: pokemonname,
         img: '/images/${pokemonname}.png',
         disabled: false,
      })
      setPoke(nextPoke)
      setNextId(nextId + 1)
      setInputName('')
      inputRef.current.focus()
   }

   //마지막 등록 포켓몬 제거
   const onRemove = () => {
      const nextPoke = pokemons.slice(0, -1)
      setPoke(nextPoke)
   }

   //더블클릭 흑백
   const onDisable = useCallback(
      //useCallback: 컴포넌트가 재랜더링될 때 함수가 재생성되지 않도록 만든다. 함수가 재생성되면 성능에 안 좋음
      (id) => {
         const updatedPoke = pokemons.map((poke) => (poke.id === id ? { ...poke, disabled: !poke.disabled } : poke))
         setPoke(updatedPoke)
      },
      [pokemons]
   )

   const pokeList = pokemons.map((poke) => (
      <li key={poke.id} onDoubleClick={() => onDisable(poke.id)}>
         <div>
            <img src={poke.img} alt={poke.name} width="130" style={{ filter: poke.disabled ? 'grayscale(100%)' : 'none' }} />
            <p>{poke.name}</p>
         </div>
      </li>
   ))

   return (
      <div>
         <h1>포켓몬 도감</h1>
         <div>
            <input
               value={inputName}
               onChange={onChange}
               ref={inputRef}
               onKeyDown={(e) => {
                  if (e.key === 'Enter') onClick()
               }}
               placeholder="151마리 수록!"
            />
            <button onClick={onClick}>포켓몬 도감 등록</button>
            <button onClick={onRemove}>등록된 포켓몬 삭제</button>
         </div>
         <ul>{pokeList}</ul>
      </div>
   )
}
export default App
