import { NextApiRequest, NextApiResponse } from "next";
import { Document } from "prismic-javascript/types/documents";
import { makeClient } from "../../prismic-configuration";

function linkResolver (doc: Document) {
  if (doc.type === 'md-article') {
    return `/articles/${doc.uid}`
  }
}

export default async function preview (req: NextApiRequest, res: NextApiResponse) {
  const {
    token: ref,
    documentId
  } = req.query

  const url = await makeClient().getPreviewResolver(ref as string, documentId as string).resolve(
    linkResolver,
    '/'
  )

  if (!url) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const encodeUrl = url.split('/').map(encodeURIComponent).join('/')

  res.setPreviewData({
    ref
  })

  // Redirect the user to the share endpoint from same origin. This is
  // necessary due to a Chrome bug:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=696204
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${encodeUrl}" />
    <script>window.location.href = '${encodeUrl}'</script>
    </head>`
  )

  res.end()
}