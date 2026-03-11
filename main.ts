// hola
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 100 && oponent_signal == 0) {
        oponent_signal = 1
        radio.sendNumber(100)
        basic.pause(100)
    }
    if (ac == 0) {
        if (receivedNumber == 1) {
            Player = 2
            radio.sendNumber(Player)
            ac = 1
        } else if (receivedNumber == 2) {
            Player = 1
            radio.sendNumber(Player)
            ac = 1
        }
    }
})
input.onButtonPressed(Button.A, function () {
    if (started == 1) {
        if (current == 2) {
            if (Player == 1) {
                Nave.move(-1)
                radio.sendValue("Nave", Nave.get(LedSpriteProperty.X))
            } else {
                Nave2.move(-1)
                radio.sendValue("Nave2", Nave2.get(LedSpriteProperty.X))
            }
        } else {
            Nave.move(-1)
        }
    } else {
        if (current == 1) {
            current = 2
            basic.showNumber(current)
        } else {
            current = 1
            basic.showNumber(current)
        }
    }
})
input.onGesture(Gesture.LogoUp, function () {
    if (Player1Paused == 1 && Player == 1) {
        radio.sendString("QuitPause")
        game.resume()
    }
    if (Player2Paused == 1 && Player == 2) {
        radio.sendString("QuitPause")
        game.resume()
    }
})
function SetPlayer () {
    Player = randint(1, 2)
    radio.sendNumber(Player)
}
input.onGesture(Gesture.ScreenDown, function () {
    if (Player == 1) {
        radio.sendString("Player1Paused")
        Player1Paused = 1
    } else {
        radio.sendString("Player2Paused")
        Player2Paused = 1
    }
    game.pause()
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "Player1Paused") {
        Player1Paused = 1
        game.pause()
    }
    if (receivedString == "Player2Paused") {
        Player2Paused = 1
        game.pause()
    }
    if (receivedString == "QuitPause") {
        Player1Paused = 0
        Player2Paused = 0
        game.resume()
    }
})
input.onButtonPressed(Button.B, function () {
    if (started == 1) {
        if (current == 2) {
            if (Player == 1) {
                Nave.move(1)
                radio.sendValue("Nave", Nave.get(LedSpriteProperty.X))
            } else {
                Nave2.move(1)
                radio.sendValue("Nave2", Nave2.get(LedSpriteProperty.X))
            }
        } else {
            Nave.move(1)
        }
    } else {
        if (current == 1) {
            current = 2
            basic.showNumber(current)
        } else {
            current = 1
            basic.showNumber(current)
        }
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "Disparo1") {
        Disparo = game.createSprite(value, 4)
    }
    if (name == "Disparo2") {
        Disparo2 = game.createSprite(value, 4)
    }
    if (name == "Enemigo") {
        Enemigo = game.createSprite(value, 0)
    }
    if (name == "Nave") {
        Nave.set(LedSpriteProperty.X, value)
    }
    if (name == "Nave2") {
        Nave2.set(LedSpriteProperty.X, value)
    }
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (started == 1) {
        music.rest(music.beat(BeatFraction.Eighth))
        music.setVolume(40)
        music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.InBackground)
        music.setVolume(128)
        if (Player == 1) {
            Disparo = game.createSprite(Nave.get(LedSpriteProperty.X), Nave.get(LedSpriteProperty.Y))
            radio.sendValue("Disparo1", Disparo.get(LedSpriteProperty.X))
        } else {
            Disparo2 = game.createSprite(Nave2.get(LedSpriteProperty.X), Nave2.get(LedSpriteProperty.Y))
            radio.sendValue("Disparo2", Disparo2.get(LedSpriteProperty.X))
        }
    } else {
        decided = 1
    }
})
function start () {
    if (current == 2) {
        Nave2 = game.createSprite(3, 4)
        Nave = game.createSprite(1, 4)
        Disparo2 = game.createSprite(2, 0)
        Disparo2.delete()
    } else {
        Nave = game.createSprite(2, 4)
    }
    Enemigo = game.createSprite(2, 0)
    Disparo = game.createSprite(2, 0)
    Enemigo.delete()
    Disparo.delete()
    game.setScore(0)
    started = 1
}
let decided = 0
let Enemigo: game.LedSprite = null
let Disparo2: game.LedSprite = null
let Disparo: game.LedSprite = null
let Player2Paused = 0
let Player1Paused = 0
let Nave2: game.LedSprite = null
let Nave: game.LedSprite = null
let started = 0
let Player = 0
let ac = 0
let oponent_signal = 0
let current = 0
radio.setGroup(1)
current = 1
basic.showNumber(1)
basic.forever(function () {
    if (started == 1) {
        if (!(Disparo.isDeleted())) {
            if (Disparo.get(LedSpriteProperty.Y) == 0) {
                Disparo.delete()
            }
        }
        if (current == 2) {
            if (!(Disparo2.isDeleted())) {
                if (Disparo2.get(LedSpriteProperty.Y) == 0) {
                    Disparo2.delete()
                }
            }
        }
    }
})
basic.forever(function () {
    if (started == 1) {
        if (!(Disparo.isDeleted())) {
            Disparo.change(LedSpriteProperty.Y, -1)
            basic.pause(100)
        }
        if (current == 2) {
            if (!(Disparo2.isDeleted())) {
                Disparo2.change(LedSpriteProperty.Y, -1)
                basic.pause(100)
            }
        }
    }
})
basic.forever(function () {
    if (started == 1) {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Blues), music.PlaybackMode.InBackground)
        basic.pause(5000)
    }
})
basic.forever(function () {
    if (started == 1) {
        if (Disparo.isTouching(Enemigo)) {
            Disparo.delete()
            Enemigo.delete()
            game.addScore(1)
        } else if (Enemigo.isTouching(Nave)) {
            game.gameOver()
        } else if (Enemigo.get(LedSpriteProperty.Y) == 4) {
            game.gameOver()
        }
        if (current == 2) {
            if (Disparo2.isTouching(Enemigo)) {
                Disparo2.delete()
                Enemigo.delete()
                game.addScore(1)
            } else if (Enemigo.isTouching(Nave) || Enemigo.isTouching(Nave2)) {
                game.gameOver()
            } else if (Enemigo.get(LedSpriteProperty.Y) == 4) {
                game.gameOver()
            }
        }
    }
})
basic.forever(function () {
    if (decided == 1 && oponent_signal == 0 && current == 2) {
        radio.sendNumber(100)
        basic.pause(200)
    } else if (decided == 1 && started == 0 && (current == 1 || oponent_signal == 1 && Player != 0 && ac == 1)) {
        if (current == 1) {
            Player = 1
        }
        start()
    } else if (decided == 1 && oponent_signal == 1 && started == 0 && (Player == 0 || ac == 0) && current == 2) {
        basic.pause(randint(0, 500))
        SetPlayer()
    }
})
basic.forever(function () {
    if (started == 1) {
        basic.pause(1000)
        if (!(Enemigo.isDeleted()) && !(game.isPaused())) {
            Enemigo.change(LedSpriteProperty.Y, 1)
        }
    }
})
basic.forever(function () {
    if (started == 1) {
        if (Enemigo.isDeleted()) {
            if (Player == 1) {
                basic.pause(randint(1000, 3000))
                Enemigo = game.createSprite(randint(0, 4), 0)
                radio.sendValue("Enemigo", Enemigo.get(LedSpriteProperty.X))
            }
        }
    }
})
