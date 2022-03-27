import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '')

        const fullpath = path.join(postsDirectory, fileName)
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

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    const precessedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = precessedContent.toString()

    return {
        id, 
        contentHtml,
        ...matterResult.data
    }
}