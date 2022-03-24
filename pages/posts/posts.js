import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(filename => {
        const id = fileName.replace(/\.md$/, '')

        const fullpath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(fullpath, 'utf8')

        const matterResult = matter(fileContents)

        return {
            id,
            ...matterResult.data
        }
    })

    return allPostsData.sort(({ date: a }, { date: b }) => {
        if(a < b)  {
            return 1
        }
        if (a > b) {
            return -1;
        }
        return 0;
    })
}