const db = require('./models')

const seedData = async () => {
    try {
        // Find the users
        const wbUser = await db.User.findOne({ email: 'w@b.com' })
        const barneyUser = await db.User.findOne({ email: 'barney@dino.com' })

        // Decks for wb user
        const wbDeck1 = new db.Deck({
            title: 'JavaScript Basics',
            user: wbUser._id,
            flashcards: [
                { front: 'What is a variable?', back: 'A storage location for data.' },
                { front: 'What is a function?', back: 'A block of code that performs a specific task.' }
            ]
        })

        const wbDeck2 = new db.Deck({
            title: 'React Fundamentals',
            user: wbUser._id,
            flashcards: [
                { front: 'What is a component?', back: 'A reusable piece of code that renders UI elements.' },
                { front: 'What is state?', back: 'An object that holds data local to a component.' }
            ]
        })

        // Decks for Barney user
        const barneyDeck1 = new db.Deck({
            title: 'CSS Basics',
            user: barneyUser._id,
            flashcards: [
                { front: 'What is a selector?', back: 'A pattern used to select elements in a stylesheet.' },
                { front: 'What is a property?', back: 'An attribute that defines the appearance of an element.' }
            ]
        })

        const barneyDeck2 = new db.Deck({
            title: 'HTML Fundamentals',
            user: barneyUser._id,
            flashcards: [
                { front: 'What is an element?', back: 'A part of a webpage represented by a tag.' },
                { front: 'What is an attribute?', back: 'A property that provides additional information about an element.' }
            ]
        })

        // Save the decks
        await wbDeck1.save()
        await wbDeck2.save()
        await barneyDeck1.save()
        await barneyDeck2.save()

        // Link the decks to the users
        wbUser.decks.push(wbDeck1, wbDeck2)
        barneyUser.decks.push(barneyDeck1, barneyDeck2)

        // Save the users
        await wbUser.save()
        await barneyUser.save()

        console.log('Seed data added!')
        process.exit()
    } catch (err) {
        console.error('Error while adding seed data:', err)
        process.exit(1)
    }
}

seedData()
