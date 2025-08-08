body {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}
h1 {
  margin-top: 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  gap: 10px;
  margin: 20px;
}
.card {
  width: 100px;
  height: 100px;
  background-color: #2e3d49;
  cursor: pointer;
  border-radius: 8px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  position: relative;
}
.card.flip {
  transform: perspective(600px) rotateY(180deg);
}
.card .front,
.card .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.front {
  background-color: #2e3d49;
  font-size: 2em;
  color: #fff;
}
.back {
  transform: rotateY(180deg);
}
img {
  max-width: 80%;
  max-height: 80%;
}
